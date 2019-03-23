import firebase_admin
from firebase_admin import db
import flask
# import os
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/eysteinngunnlaugsson/Documents/healthcare_hackathon/actual_project/api/more-health-firebase-adminsdk-z3um3-7eecbde28b.json"
#import os
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/fannar/Documents/Code/nhh/api/more-health-firebase-adminsdk-z3um3-7eecbde28b.json"


firebase_admin.initialize_app(options={
    'databaseURL': 'https://more-health.firebaseio.com/',
})

COMPANIES = db.reference('companies')