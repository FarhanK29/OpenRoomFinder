#Selenium Imports
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#Beautiful Soup import 
from bs4 import BeautifulSoup 
#Time for timer at the end before closing
import time
 

driver = webdriver.Chrome() 
driver.get('https://classes.rutgers.edu/soc/#home');


WebDriverWait(driver, 20).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="FALL_SPRING_1_TEXT"]'))
)

formBoxes = ['//*[@id="FALL_SPRING_1_TEXT"]', '//*[@id="div-location"]/ul/li[1]/label/span', '//*[@id="level_U"]', '//*[@id="level_G"]', '//*[@id="continueButton"]']

#Complete form to access all classes in New Brunswick
for box in formBoxes:
    selector = driver.find_element('xpath', box)
    selector.click()
#Form Submitted



selector = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="school_search_id"]'))
)
selector.click() #Click on School/Unit



allClasses = []


#Created dropdown selector for repetitive use
dropdown = driver.find_element('xpath', '//*[@id="widget_dijit_form_FilteringSelect_1"]/div[1]/input')


#Iterate through each school/unit
for school in range(26):

    #Click on Dropdown
    dropdown.click()#Click on searchbar Dropdown
    
    

    try:
        option = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.ID, f"dijit_form_FilteringSelect_1_popup{school}"))
    )
        #Click on each School
        option.click()

        #Wait until page is loaded before accessing data
        WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.ID, "courseDataParent"))
        )

        #Initialize html_content with current html
        html_content = driver.page_source

        #Initialize BeautifulSoup scraper
        soup = BeautifulSoup(html_content, 'html.parser')

        #Find spans of all rooms, hours, and days
        rooms = soup.find_all('span', class_='meetingTimeBuildingAndRoom')
        hours = soup.find_all('span', class_='meetingTimeHours')
        days= soup.find_all('span', class_= 'meetingTimeDay') 

        for iterator in range(len(rooms)):
            if(rooms[iterator].get_text(strip=True) != ""):
                roomInfo = [rooms[iterator].get_text(strip=True), hours[iterator].get_text(strip=True), days[iterator].get_text(strip=True)]
                if roomInfo not in allClasses:
                    allClasses.append(roomInfo)


      
    

            











    except Exception as e:
        print(f"Error interacting with div: {e}")



time.sleep(1)#Just for visibility, seeing that everything is done before closing

driver.quit()

with open('roomInfoScraper/room_schedule.txt', 'w') as file:
    for item in allClasses:
        file.write(str(item) + '\n')  # Add a newline after each item