from flask import Flask, Response, json
from TwitterAPI import TwitterAPI
from alchemy import AlchemyAPI
from secretKey import getKeys
import sys, traceback

app = Flask(__name__)

@app.route("/<bias>/<path:url>")
def twitterScraper(bias, url):
    try:
        ##Load keys from other file and initialize the APIS
        consumer_key, consumer_secret, access_token_key, access_token_secret = getKeys()
        api = TwitterAPI(consumer_key, consumer_secret, access_token_key, access_token_secret)
        alchemyAPI = AlchemyAPI()

        ##Get the list of keywords for the page
        response = alchemyAPI.keywords('url', url, {'sentiment': 1})

        ##Put relevant keywords in a list
        keys = []
        for x in response['keywords']:
            if float(x['relevance']) > 0.6:
                keys.append(x['text'])
                if len(keys) >= 5:
                    break

        
        alreadyAdded = set()
        htmlString = "<body>\n"
        ##Get some tweets for each of the relevant keywords
        for key in keys:
            key += ' ' + bias;
            tweetList = api.request('search/tweets', {'q':str(key), 'lang':'en'})

            for x in tweetList:
                ##Skip non english
                if x['lang'] != 'en':
                    continue
                if x['text'][:2] == "RT":
                    continue

                htmlString += "<blockquote class=\"twitter-tweet\" lang=\"en\"><p>"
                htmlString += x['text']
                htmlString += "</p>&mdash;"
                htmlString += x['user']['name']
                htmlString += " (@"
                htmlString += x['user']['screen_name']
                htmlString += ") <a href=\"https://twitter.com/"
                htmlString += x['user']['screen_name']
                htmlString += "/status/"
                htmlString += str(x['id'])
                htmlString += "\">"
                htmlString += "</a></blockquote> <script async src=\"http://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n"

        htmlString += "</body>"
        
        return htmlString
    except Exception as e:
        return "There was some kind of error, Go home"
    

def convertToDate(rawDate):
    year = rawDate[-4:]
    rawDate = rawDate[4:]
    monthDict = {'Jan' : 'January', 'Feb' : 'February', 'Mar' : 'March', 'Apr' : 'April',
              'May' : 'May', 'Jun' : 'June', 'Jul' : 'July', 'Aug' : 'August',
              'Sep' : 'September', 'Oct' : 'October', 'Nov' : 'November', 'Dec' : 'December'}
    month = monthDict[rawDate[:3]]
    rawDate = rawDate[4:]
    day = str(int(rawDate[:2]))

    finalForm = month + " " + day + ", " + year

    

if __name__ == "__main__":
    app.run()
