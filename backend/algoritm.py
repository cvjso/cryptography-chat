import sys
import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
from rsa import PublicKey

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

# Cifra de cesar
def cifra_cesar(input_string, shift):
    def rotate(ch, shift):
        if (ch.upper() not in ALPHABET):
            return ''
        i = (ALPHABET.index(ch.upper()) + shift) % 26
        return ALPHABET[i]
    cipherText = ''
    for ch in input_string:
        cipherText += rotate(ch,shift)
    return cipherText


# Maquina de rotor
class Machine:
    """
    Models an Enigma machine (https://en.wikipedia.org/wiki/Enigma_machine)

    Args:
        rotors (list[Rotor]) the configured rotors
        reflector (Reflector) to use
    """

    ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    def __init__(self, rotors, reflector):
        self.rotors = rotors
        self.reflector = reflector

    def encipher(self, text):
        """
        Encipher the given input

        Args: text (string) plain text to encode

        Returns: string
        """
        return "".join((self.encipher_character(x) for x in text.upper()))

    def decipher(self, text):
        """
        Deccipher the given input

        Args: text (string) cipher text to decode

        Returns: string
        """

        for rotor in self.rotors:
            rotor.reset()

        return self.encipher(text)

    def encipher_character(self, x):
        """
        Runs a character through the machine's cipher algorithm

        1. If x is not in the known character set, don't encipher it
        2. For each of the rotors, determine the character in contact with x.
           Determine the enciphering for that character, and use it as the next
           letter to pass through to the next rotor in the machine's sequence
        3. Once we get to the reflector, get the reflection and repeat the above
           in reverse
        4. Rotate the first rotor, and check if any other rotor should be rotated
        5. Return the character at the terminating contact position as the input
           character's enciphering

        Args: x (char) the character to encode

        Returns: char
        """

        if x not in Machine.ALPHABET:
            return x

        # compute the contact position of the first rotor and machine's input
        contact_index = Machine.ALPHABET.index(x)

        # propagate contact right
        for rotor in self.rotors:
            contact_letter = rotor.alphabet[contact_index]
            x = rotor.encipher(contact_letter)
            contact_index = rotor.alphabet.index(x)

        # reflect and compute the starting contact position with the right rotor
        contact_letter = Machine.ALPHABET[contact_index]
        x = self.reflector.reflect(contact_letter)
        contact_index = Machine.ALPHABET.index(x)

        # propagate contact left
        for rotor in reversed(self.rotors):
            contact_letter = rotor.alphabet[contact_index]
            x = rotor.decipher(contact_letter)
            contact_index = rotor.alphabet.index(x)

        # rotate the first rotor and anything else that needs it
        self.rotors[0].rotate()
        for index in range(1, len(self.rotors)):
            rotor = self.rotors[index]
            turn_frequency = len(Machine.ALPHABET)*index
            if self.rotors[index-1].rotations % turn_frequency == 0:
                rotor.rotate()

        # finally 'light' the output bulb
        return Machine.ALPHABET[contact_index]


class Rotor:
    """
    Models a 'rotor' in an Enigma machine

    Rotor("BCDA", 1) means that A->B, B->C, C->D, D->A and the rotor has been
    rotated once from ABCD (the clear text character 'B' is facing the user)

    Args:
        mappings (string) encipherings for the machine's alphabet.
        offset (int) the starting position of the rotor
    """

    def __init__(self, mappings, offset=0):
        self.initial_offset = offset
        self.reset()
        self.forward_mappings = dict(zip(self.alphabet, mappings))
        self.reverse_mappings = dict(zip(mappings, self.alphabet))

    def reset(self):
        """
        Helper to re-initialize the rotor to its initial configuration

        Returns: void
        """

        self.alphabet = Machine.ALPHABET
        self.rotate(self.initial_offset)
        self.rotations = 1

    def rotate(self, offset=1):
        """
        Rotates the rotor the given number of characters

        Args: offset (int) how many turns to make

        Returns: void
        """
        self.rotations = offset
        self.alphabet = self.alphabet[offset:] + self.alphabet[:offset]

    def encipher(self, character):
        """
        Gets the cipher text mapping of a plain text character

        Args: character (char)

        Returns: char
        """
        return self.forward_mappings[character]

    def decipher(self, character):
        """
        Gets the plain text mapping of a cipher text character

        Args: character (char)

        Returns: char
        """
        return self.reverse_mappings[character]


class Reflector:
    """
    Models a 'reflector' in the Enigma machine. Reflector("CDAB")
    means that A->C, C->A, D->B, B->D

    Args: mappings (string) bijective map representing the reflection
          of a character
    """

    def __init__(self, mappings):
        self.mappings = dict(zip(Machine.ALPHABET, mappings))

        for x in self.mappings:
            y = self.mappings[x]
            if x != self.mappings[y]:
                raise ValueError("Mapping for {0} and {1} is invalid".format(x, y))

    def reflect(self, character):
        """
        Returns the reflection of the input character

        Args: character (char)

        Returns: char
        """
        return self.mappings[character]


def generate_reflector(key):
    already_swaped = []
    alpha = list(ALPHABET)
    for i in range(len(alpha)):
        new_pos = (key + i) % len(alpha)
        if alpha[i] not in already_swaped and alpha[new_pos] not in already_swaped:
            interm = alpha[i]
            alpha[i] = alpha[new_pos]
            alpha[new_pos] = interm
            already_swaped.append(alpha[i])
            already_swaped.append(alpha[new_pos])
    return "".join(alpha)

SECRET_KEY = "the five boxing wizards jump quickly".upper()

def generate_communication_key(SessionKey):
    plain_text = SECRET_KEY
    key_one = int(SessionKey)
    key_two = int(SessionKey)//2

    first_cypher = cifra_cesar(plain_text, key_one)

    rotor = Rotor(cifra_cesar(ALPHABET, key_one), 1)
    reflector = Reflector(generate_reflector(key_two))
    machine = Machine([rotor], reflector)

    second_cypher = machine.encipher(first_cypher)
    return second_cypher

class AESCipher(object):

    def __init__(self, key): 
        self.bs = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]

secret_code = "Unguessable"

def get_public_key():
    public_key = open("public_key.bin", "rb").read()
    return public_key


def RSA_encrypt(plain_text, public_key):
    recipient_key = RSA.import_key(public_key)
    cipher_rsa = PKCS1_OAEP.new(recipient_key)
    enc_communication_key = cipher_rsa.encrypt(plain_text.encode('utf-8'))
    return enc_communication_key