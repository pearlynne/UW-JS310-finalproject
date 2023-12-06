
# <p align="center">Everyday list <br>a minimalist to-do-list for neurodiverse cat lovers </p>
<p align="center">
<img width="600" src="https://github.com/pearlynne/UW-JS310-finalproject/assets/41930579/ee769ad5-a21f-4af7-987f-3342562c6429">
</p>

It is basic tool to add your tasks for the day and provide a small reward of cat images with motivational text when you complete a task. 

## Table of contents
1. [Motivation](#motivation)
2. [Built with](#builtwith) 
3. [Key features](#keyfeatures)
4. [Project files description](#projectfiles)
5. [Acknowledgements/Sources](#sources)

## Motivation <a name="motivation"></a>
I have tried many types of productivity apps, from [Monday.com](http://Monday.com) to [Clickup](https://clickup.com/) and even [Basecamp](http://basecamp.com). They all have their advantages! However, I felt that I was always missing mini reward when I completed the tasks.  Furthermore, it can get overwhelming when we get into the weeds of tags, projects, sub-tasks, groups.

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
- <input type="checkbox" disabled /> Add Catch errors for fetch
    - The assumption is that Cataas API remains unedited. However, if the user prefers to amend the motivational text (i.e., “Good Job!”), a catch error can help navigate that process.

## Acknowledgements/Sources <a name="sources"></a>
- This is an extension from <a href="https://github.com/UWC2-JSCRIPT/au23-310-class-5-exercises-pearlynne/blob/master/toDoList.js"> UW JS310 Class 5 homework </a> 
- Modal CSS code modified from <a href="https://www.w3schools.com/howto/howto_css_modal_images.asp"> W3 Schools </a>
