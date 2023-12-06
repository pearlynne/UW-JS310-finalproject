# <center><span style="color:#CBC3E3; font-family:'Bradley Hand'">Everyday list</span> <br>a minimalist to-do-list for neurodiverse cat lovers </center>
<span style="color:#CBC3E3; font-family:'Bradley Hand'">Everyday List</span> is a work-in-progress to-do-list. 

It is basic tool to add your tasks for the day and provide a small reward of cat images with motivational text when you complete a task. 

## Table of contents
1. [Motivation](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#movtivation)
2. [Built with](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#builtwith)
3. [Key features](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#keyfeatures)
4. [Project files description](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#projectfiles)
5. [Getting started](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#gettingstarted)
6. [Roadmap](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#roadmap)
7. [Acknowledgements/Sources](notion://www.notion.so/ReadMe-2e97718c716c493c8abbf02c1ac9fc66#sources)

## Motivation <a name="motivation"></a>
I have tried many types of productivity apps, from [Monday.com](http://Monday.com) to Clickup. They all have their advantages! However, I felt that I was always missing mini reward when I completed the tasks.  Furthermore, for neurodiverse individuals, it can get overwhelming when we get into the weeds of tags, projects, sub-tasks, groups.

Therefore, I decided to create a basic to-do-list that focuses on tasks just for the day. It stores the tasks to the local storage and removes those that have been completed. 

## Built with / Requirements <a name="builtwith"></a>
- Javascript
- Cataas API [no key required]

## Key features <a name="keyfeatures"></a>
- Works on Chrome browser
- Sets to local storage
- Client-side sessions
- Form validations
- Modal image of cat with motivational text

## Project files description <a name="projectfiles"></a>
- templates/: contains the frontend dynamic HTML file for the to-do-list
- static/: contains CSS stylesheet

## Roadmap <a name="Roadmap"></a>
There is still room for improvements and new features to be added. These are the following planned:
- <input type="checkbox" disabled /> Changing local storage format to JSON:
    - It currently saves as a string of HTML text.
- <input type="checkbox" disabled /> Add Catch errors for fethc
    - The assumption is that Cataas API remains unedited. However, if the user prefers to amend the motivational text (i.e., “Good Job!”), a catch error can help navigate that process.

## Acknowledgements/Sources <a name="sources"></a>
- This is an extension from <a href="https://github.com/UWC2-JSCRIPT/au23-310-class-5-exercises-pearlynne/blob/master/toDoList.js"> UW JS310 Class 5 homework </a> 
- Modal CSS code modified from <a href="https://www.w3schools.com/howto/howto_css_modal_images.asp"> W3 Schools </a>