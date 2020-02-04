How to configure ReactJS Module

1- deploy both ls-sales-demo-module and ls-sales-demo-rest
   	Code is available at the following public repos:

	https://github.com/hsheikhhasan/lr-sales-demo-rest 
	https://github.com/hsheikhhasan/lr-sales-demo-module  
	
2- make sure not to delete user with email test@liferay.com/ test
3- create a vocabulary and call it "Locations"
4- create number of categories and subcategories, example: Canada --> Ottawa, Germany --> Berlin
5- add a new web content structure, call it "Announcements" and use this source:

{
    "availableLanguageIds": [
        "en_US"
    ],
    "defaultLanguageId": "en_US",
    "fields": [
        {
            "label": {
                "en_US": "Title"
            },
            "predefinedValue": {
                "en_US": ""
            },
            "style": {
                "en_US": ""
            },
            "tip": {
                "en_US": ""
            },
            "dataType": "string",
            "indexType": "keyword",
            "localizable": true,
            "name": "title",
            "readOnly": false,
            "repeatable": false,
            "required": true,
            "showLabel": true,
            "type": "text"
        },
        {
            "label": {
                "en_US": "Content"
            },
            "predefinedValue": {
                "en_US": ""
            },
            "style": {
                "en_US": ""
            },
            "tip": {
                "en_US": ""
            },
            "dataType": "html",
            "fieldNamespace": "ddm",
            "indexType": "text",
            "localizable": true,
            "name": "content",
            "readOnly": false,
            "repeatable": false,
            "required": true,
            "showLabel": true,
            "type": "ddm-text-html"
        },
        {
            "label": {
                "en_US": "Documents and Media"
            },
            "predefinedValue": {
                "en_US": ""
            },
            "style": {
                "en_US": ""
            },
            "tip": {
                "en_US": ""
            },
            "dataType": "document-library",
            "fieldNamespace": "ddm",
            "indexType": "keyword",
            "localizable": true,
            "name": "documents",
            "readOnly": false,
            "repeatable": false,
            "required": false,
            "showLabel": true,
            "type": "ddm-documentlibrary"
        }
    ]
}


6- create few web contents, make sure to assign locations (Ottawa, Berlin ..etc) from METADATA --> Locations
7- register REST service: Control Panel --> Configuration --> Service Access policy, make sure to keep method name field empty.
	name: SalesDemoRestApplication
	Title: Sales Demo RestJS REST Service
	Service Class: com.liferay.sales.demo.rest.application.SalesDemoRestApplication

8- configure the portlet:
	- select a preferred Location
	- for the vocabulary Id: go to control panel - categorization - cateogry and right click on "Locations" vocabulary 
          and open link in a new tab, at the end of the link you will see the vocabulary Id.

9- for structure Id: it is available under web content structure list
10- pick the APIs Type, you have few options here: REST, JSON-WS and Headless