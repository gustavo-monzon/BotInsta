# Instagram Bot

<img src="https://media.giphy.com/media/BWD3CtcudWL28/giphy.gif" width="600" height="400" />

A Bot who acts like a real IG user. Gives likes, follow & unfollow. All actions are parametizable and timing between actions is configurable. It use firebase to save followed users and, after a few days, unfollows them.

## Getting Started

In ```/Bot/config/puppeteer.json``` you can set all the configuration for your account
```
{
    "base_url": "https://www.instagram.com",
    "username": "your_user",
    "password": "your_password",
    "hashTags": ["hashtag1","hashtag2","hashtag3"],
    "settings": {
      "run_every_x_hours": 3,
      "like_ratio": 0.75,
      "unfollow_after_days": 2,
      "headless": false
    },
    "selectors": {
      "home_to_login_button": ".izU2O a",
      "username_field": "input[type=\"text\"]",
      "password_field": "input[type=\"password\"]",
      "login_button": "button[type=\"submit\"]",
      "post_heart_grey": "span.glyphsSpriteHeart__outline__24__grey_9",
      "post_username": "div.e1e1d > h2.BrX75 > a",
      "post_follow_link": ".bY2yH > button",
      "post_like_button": "span.fr66n > button",
      "post_follow_button": "span.oW_lN._1OSdk > button",
      "post_close_button": "button.ckWGn",
      "user_unfollow_button": "span.vBF20 > button._5f5mN",
      "user_unfollow_confirm_button": "div.mt3GC > button.aOOlW.-Cab_",
      "not_now_button": ".HoLwm",
      "hash_tags_base_class": ".EZdmt"
    }
  }
```
## Prerequisites

* Node JS


## Installing

* set up your ```firebase``` project and replace config files
* run ```npm install```

## Built With

* Firebase
* Puppeteer

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Run Project

* node index.js

