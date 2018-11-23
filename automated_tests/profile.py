from selenium import webdriver
from enum import Enum
from time import sleep

# GLOBALS
baseUrl = 'https://instagraminreact.herokuapp.com/'

# función que haga login a usuario y llevarlo a profile
def journeyToProfile():
    browser = webdriver.Chrome()
    browser.get(baseUrl)
    sleep(1)
    browser.find_element_by_id('email').send_keys('jmbeauregard@ymail.com')
    browser.find_element_by_id('password').send_keys('12345678')
    browser.find_element_by_id('submitBtn').click()
    sleep(1)
    browser.get(baseUrl + 'profile')
    print('TEST journeyToProfile ----- [OK]') if browser.current_url == (baseUrl + 'profile') else print('TEST journeyToProfile ----- [FAILED]')
    browser.quit()   

if __name__ == "__main__":
    journeyToProfile()