from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from bs4 import BeautifulSoup 
import re #regular expression library to parse our data


driver = webdriver.Chrome() 
driver.get('https://classes.rutgers.edu/soc/#home');


WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="FALL_SPRING_1_TEXT"]'))
)

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


# WebDriverWait(driver, 7, poll_frequency=5).until(EC.presence_of_element_located((By.XPATH, '//*[@id="footer"]/p[1]"]')), 'Timed out waiting for simple alert to appear')
time.sleep(1.5)
selector = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="school_search_id"]'))
)
selector.click() #Click on School/Unit





i = 0
#Iterate through each school/unit
for i in range(26):
    #Click on Dropdown
    dropdown = driver.find_element('xpath', '//*[@id="widget_dijit_form_FilteringSelect_1"]/div[1]/input')
    dropdown.click()#Click on searchbar Dropdown
    
    
    option = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, f"dijit_form_FilteringSelect_1_popup{i}"))
    )
    try:
        #Click on each School
        option.click()

        #Wait until page is loaded before accessing data

        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "courseDataParent"))
        )

        #Initialize html_content with current html
        html_content = driver.page_source

        #Initialize BeautifulSoup scraper
        soup = BeautifulSoup(html_content, 'html.parser')

        meeting_times_divs = soup.find_all('div', class_='sectionMeetingTimesDiv')
        print(meeting_times_divs)





        #className = sectionMeetingTimesDiv
        #Room: meetingTimeBuildingAndRoom
        #Time: meetingTimeHours
        #Day: meetingTimeDay


    except Exception as e:
        print(f"Error interacting with div: {e}")

 







time.sleep(2)

driver.quit()