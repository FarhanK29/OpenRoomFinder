from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from bs4 import BeautifulSoup 
import re #regular expression library to parse our data


driver = webdriver.Chrome() 
driver.get('https://classes.rutgers.edu/soc/#home');
time.sleep(2)


#Complete form to access all classes in New Brunswick
selector = driver.find_element("xpath", '//*[@id="FALL_SPRING_1_TEXT"]')
selector.click()
selector = driver.find_element('xpath', '//*[@id="div-location"]/ul/li[1]/label/span')
selector.click()
selector = driver.find_element('xpath', '//*[@id="level_U"]')
selector.click()
selector = driver.find_element('xpath','//*[@id="level_G"]' )
selector.click()
selector = driver.find_element('xpath', '//*[@id="continueButton"]')
selector.click()
#Form Submitted

'''
elem = WebDriverWait(driver, 30).until(
EC.presence_of_element_located((By.ID, "Element_to_be_found")) #This is a dummy element
)
finally:
'''
# WebDriverWait(driver, 7, poll_frequency=5).until(EC.presence_of_element_located((By.XPATH, '//*[@id="footer"]/p[1]"]')), 'Timed out waiting for simple alert to appear')
time.sleep(1.5)
selector = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="school_search_id"]'))
)
selector.click() #Click on School/Unit

#Click on Dropdown
dropdown = driver.find_element('xpath', '//*[@id="widget_dijit_form_FilteringSelect_1"]/div[1]/input')
dropdown.click()#Click on searchbar Dropdown
    
#Click each proceeding option
# option = WebDriverWait(driver, 10).until(
#     EC.presence_of_all_elements_located((By.ID, f"dijit_form_FilteringSelect_1_popup1"))
# )
# option.click()

option = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.XPATH, f'//*[@id="dijit_form_FilteringSelect_1_popup0"]'))
)
option.click()





# i = 0
# #Iterate through each school/unit
# for i in range(26):
#     #Click on Dropdown
#     dropdown = driver.find_element('xpath', '//*[@id="widget_dijit_form_FilteringSelect_1"]/div[1]/input')
#     dropdown.click()#Click on searchbar Dropdown
    
#     #Click each proceeding option
#     option = WebDriverWait(driver, 10).until(
#         EC.presence_of_all_elements_located((By.ID, f"dijit_form_FilteringSelect_1_popup{i}"))
#     )
#     try:
#         option.click()
#         time.sleep(0.25)
#     except Exception as e:
#         print(f"Error interacting with div: {e}")

 







time.sleep(2)

driver.quit()