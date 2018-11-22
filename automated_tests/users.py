from faker import Faker
from faker.providers import address, internet, job
from selenium import webdriver
from enum import Enum
from time import sleep

# GLOBALS
baseUrl = 'https://instagraminreact.herokuapp.com'
fake = Faker()
fake.add_provider(address)
fake.add_provider(internet)
fake.add_provider(job)
fake.seed_instance(4521)

class DummyUser(Enum):
    firstname   = fake.first_name()
    lastname    = fake.last_name()
    username    = fake.city()
    email       = fake.free_email()
    password    = '12345678'
    cpassword   = '12345678'
    description = fake.job()
class ValidUser(Enum):
    email    = 'jmbeauregard@ymail.com'
    password = '12345678'

# función que crea usuario y despues hace login
def createUser():
    browser = webdriver.Chrome()
    browser.get(baseUrl)
    sleep(1)
    browser.find_element_by_xpath('//*[@id="root"]/div/div/div/form/a/button').click()
    sleep(1)
    browser.find_element_by_id('name').send_keys(DummyUser.firstname.value)
    browser.find_element_by_id('lastName').send_keys(DummyUser.lastname.value)
    browser.find_element_by_id('username').send_keys(DummyUser.username.value)
    browser.find_element_by_id('email').send_keys(DummyUser.email.value)
    browser.find_element_by_id('password').send_keys(DummyUser.password.value)
    browser.find_element_by_id('cpassword').send_keys(DummyUser.cpassword.value)
    browser.find_element_by_id('desc').send_keys(DummyUser.password.value)
    browser.find_element_by_id('submitBtn').click()
    sleep(1.5)
    if browser.current_url is baseUrl:
        print('TEST createUser ----- [OK]')
    else:
        print('TEST createUser ----- [FAILED]')
    browser.quit()

# función que no crea usuario por datos faltantes
def invalidCreateUser():
    browser = webdriver.Chrome()
    browser.get(baseUrl)
    sleep(1)
    browser.find_element_by_xpath('//*[@id="root"]/div/div/div/form/a/button').click()
    sleep(1)
    browser.find_element_by_id('name').send_keys(DummyUser.firstname.value)
    browser.find_element_by_id('lastName').send_keys(DummyUser.lastname.value)
    browser.find_element_by_id('username').send_keys(DummyUser.username.value)
    browser.find_element_by_id('password').send_keys(DummyUser.password.value)
    browser.find_element_by_id('cpassword').send_keys(DummyUser.cpassword.value)
    browser.find_element_by_id('desc').send_keys(DummyUser.password.value)
    browser.find_element_by_id('submitBtn').click()
    sleep(1.5)
    if browser.current_url is (baseUrl + '/sign-up'):
        print('TEST invalidCreateUser ----- [OK]')
    else:
        print('TEST invalidCreateUser ----- [FAILED]')
    browser.quit()

# función que hace login el usuario y despues cierra sesión
def loginAndLogoutUser():
    browser = webdriver.Chrome()
    browser.get(baseUrl)
    sleep(1)
    browser.find_element_by_id('email').send_keys(ValidUser.email.value)
    browser.find_element_by_id('password').send_keys(ValidUser.password.value)
    browser.find_element_by_id('submitBtn').click()
    sleep(1)
    browser.find_element_by_id('exitapp').click()
    sleep(1.5)
    if browser.current_url is (baseUrl + '/sign-in'):
        print('TEST createUser ----- [OK]')
    else:
        print('TEST createUser ----- [FAILED]')
    browser.quit()


createUser()
invalidCreateUser()
loginAndLogoutUser()