# from distutils.core import setup
import setuptools

setuptools.setup(name='multidns', version='1.0.0',
                 packages=setuptools.find_packages(), requires=['dnspython'])
