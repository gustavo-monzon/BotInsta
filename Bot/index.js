class InstagramBot {
  constructor() {
    this.firebase_db = require("./db");
    this.config = require("./config/puppeteer.json");
  }

  randomWait(number) {
    let randomWait = number + Math.floor(Math.random() * 500);
    console.log("Esperando ", randomWait);
    return randomWait;
  }

  async initPuppeter() {
    const puppeteer = require("puppeteer");
    this.browser = await puppeteer.launch({
      headless: this.config.settings.headless,
      args: ["--no-sandbox"],
      defaultViewport: {
        width: 1200,
        height: 860,
      },
    });
    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1280, height: 820 });
  }

  async visitInstagram() {
    //visita instagram e ingresa a la seccion de logueo
    await this.page.goto(this.config.base_url, { timeout: 60000 });
    await this.page.waitFor(this.randomWait(1250));
    //await this.page.click(this.config.selectors.home_to_login_button);
    //await this.page.waitFors(2500);
    // comienza a loguearse
    await this.page.click(this.config.selectors.username_field);
    await this.page.keyboard.type(this.config.username);
    await this.page.click(this.config.selectors.password_field);
    await this.page.keyboard.type(this.config.password);
    await this.page.click(this.config.selectors.login_button);
    this.page.waitForNavigation();
    // no permite las notificaciones si es que aparece el cartel
    await this.page.click(this.config.selectors.not_now_button);
  }

  async visitUserProfile() {
    await this.page.goto(this.config.base_url + "/" + this.config.username, {
      timeout: 60000,
    });
    await this.page.waitFor(this.randomWait(2250));
  }

  async _doPostLikeAndFollow(parentClass, page) {
    for (let row = 1; row < 4; row++) {
      //loops through each row
      for (let column = 1; column < 4; column++) {
        //loops through each item in the row
        let br = false;
        //Try to select post
        await page
          .click(
            `${parentClass} > div > div > .Nnq7C:nth-child(${row}) > .v1Nh3:nth-child(${column}) > a`
          )
          .catch((e) => {
            console.log(e.message);
            br = true;
          });
        //await this.page.waitForSelector("._2hvTZ");
        await this.page.waitFor(this.randomWait(3250)); //wait for random amount of time
        /*const loginModal = await this.page.waitForSelector(
          this.config.selectors.modalLogin
        );
        await this.page.focus(this.config.selectors.modalLogin);
        if (loginModal !== null) {
          console.log(loginModal);
          console.log("LOGIN DE NUEVO");
          await this.page.click(this.config.selectors.username_field);
          await this.page.keyboard.type(this.config.username);
          await this.page.click(this.config.selectors.password_field);
          await this.page.keyboard.type(this.config.password);
          await this.page.click(this.config.selectors.login_button);
        } else {
          // handle not exists id
          console.log("Not Found");
        }*/
        if (br) continue; //if successfully selecting post continue
        //get the current post like status by checking if the selector exist
        let hasEmptyHeart =
          (await this.page.$(this.config.selectors.post_heart_grey_en)) !==
            null ||
          (await this.page.$(this.config.selectors.post_heart_grey_es)) !==
            null;
        await this.page.waitFor(this.randomWait(4250));
        //FOLLOW POST
        /*await this.page.waitForSelector(this.config.selectors.post_follow_link);
        let followButton = await this.page.$(
          this.config.selectors.post_follow_link
        );
        await this.page.waitFor(this.randomWait(5250));
        let followButtonText = await this.page.evaluate(
          (el) => el.innerText,
          followButton
        );
        console.log(followButtonText);
        await this.page.waitFor(this.randomWait(1250));
        let isUnfollowUser =
          followButtonText === "Seguir" || followButtonText === "Follow";*/
        //get the username of the current post
        await this.page.waitFor(this.randomWait(2250));
        //await this.page.waitForSelector(this.config.selectors.post_username);
        //let user = await this.page.$(this.config.selectors.post_username);
        //await this.page.waitForSelector(this.config.selectors.post_image_profile);
        //let user_image = await this.page.$(this.config.selectors.post_image_profile);
        // await await this.page.waitFor(3500);
        // console.log(user_image)
        //let username = await this.page.evaluate(el => el.innerText, user);
        //console.log(`INTERACTUANDO CON ..  ${user_image}'s POST`);

        //like the post if not already liked. Check against our like ratio so we don't just like all post
        //Math.random() < this.config.settings.like_ratio
        if (hasEmptyHeart) {
          await this.page.click(this.config.selectors.post_like_button); //click the like button
          //console.log('ME GUSTA DADO SOBRE LA PUBLICACION DE... ' + username);
          console.log("Dando Me gusta");
          await this.page.waitFor(this.randomWait(3250)); //wait for random amount of time
        }

        // FOLLOW POST
        //let's check from our archive if we've follow this user before
        /*
        if (isUnfollowUser) {
          await this.page.click(this.config.selectors.post_follow_link); //click the follow button
          //console.log('COMENCE A SEGUIR A ..  ' + username);
          console.log("Siguiendo a un usuario");
          await this.page.waitFor(this.randomWait(4250)); //wait for random amount of time
        }
        */

        await this.page.click(this.config.selectors.username_button); //go to profile
        //await this.page.click(this.config.selectors.user_image); //go to profile
        await this.page.waitFor(this.randomWait(5250)); //wait for random amount of time
        await this.page.waitForSelector(this.config.selectors.followers_button); //wait for the followers button
        let isFollowersButton = await this.page.$(
          this.config.selectors.followers_button
        );
        await this.page.waitFor(this.randomWait(1250)); //wait for random amount of time
        if (isFollowersButton) {
          await this.page.click(this.config.selectors.followers_button); // go to followers profile
          await this.page.waitFor(this.randomWait(2250)); //wait for random amount of time
        }

        let lenghtMax = 10;

        for (let follower = 1; follower <= lenghtMax; follower++) {
          await this.page.waitFor(this.randomWait(3250)); //wait for random amount of time
          let followerButton = await this.page.$(
            `${this.config.selectors.follow_followers_button}:nth-child(${follower}) > div > div.Pkbci > button`
          );
          let followerName = await this.page.$(
            `${this.config.selectors.follow_followers_button}:nth-child(${follower}) > div > div.t2ksc > a.FPmhX`
          );
          //let followerNameText = await this.page.evaluate(el => el.innerText, followerName);
          console.log(follower, followerButton);
          //console.log(follower, followerName);
          await this.page.waitFor(this.randomWait(4250)); //wait for random amount of time
          if (followerButton !== null) {
            let followerButtonText = await this.page.evaluate(
              (el) => el.innerText,
              followerButton
            );
            console.log(followerButtonText);
            await this.page.waitFor(this.randomWait(5250)); //wait for random amount of time
            if (
              followerButtonText === "Follow" ||
              followerButtonText === "Seguir"
            ) {
              await this.page.waitFor(this.randomWait(10250)); //wait for random amount of time
              await followerButton.click({ clickCount: 1 });
              //await this.page.click(followerButton); // following first 10 followeres
              console.log("SE SIGUE A UN SEGUIDOR");
            } else {
              console.log(lenghtMax, "SUMANDO");
              if (lenghtMax === 30) {
                break;
              }
              lenghtMax++;
            }
          } else {
            console.log(lenghtMax, "SIN BOTON SEGUIR");
            lenghtMax++;
            if (lenghtMax === 30) {
              break;
            }
          }
        }

        console.log("RETROCESO");
        await this.page.goBack();
        await this.page.waitFor(this.randomWait(1250)); //wait for random amount of time
        await this.page.goBack();
        await this.page.waitFor(this.randomWait(2250)); //wait for random amount of time
        await this.page.goBack();
        await this.page.waitFor(this.randomWait(3250)); //wait for random amount of time
      }
    }
  }

  async visitHashtagUrl() {
    const shuffle = require("shuffle-array");
    let hashTags = shuffle(this.config.hashTags);
    // loop through hashTags
    for (let tagIndex = 0; tagIndex < hashTags.length; tagIndex++) {
      console.log("ACTUALMENTE EXPLORANDO A ... #" + hashTags[tagIndex]);
      //visit the hash tag url
      await this.page.waitFor(this.randomWait(6250));
      await this.page.goto(
        `${this.config.base_url}/explore/tags/` + hashTags[tagIndex] + "/?hl=en"
      );
      // Loop through the latest 9 posts
      await this.page.waitFor(this.randomWait(7250));
      await this._doPostLikeAndFollow(
        this.config.selectors.hash_tags_base_class,
        this.page
      );
    }
  }

  async unFollowUsers() {
    let date_range =
      new Date().getTime() -
      this.config.settings.unfollow_after_days * 86400000;

    // get the list of users we are currently following
    let following = await this.firebase_db.getFollowings();
    let users_to_unfollow = [];
    if (following) {
      const all_users = Object.keys(following);
      // filter our current following to get users we've been following since day specified in config
      users_to_unfollow = all_users.filter(
        (user) => following[user].added < date_range
      );
    }

    if (users_to_unfollow.length) {
      for (let n = 0; n < users_to_unfollow.length; n++) {
        let user = users_to_unfollow[n];
        await this.page.goto(`${this.config.base_url}/${user}/?hl=en`);
        await this.page.waitFor(this.randomWait(4250));

        let followStatus = await this.page.evaluate((x) => {
          let element = document.querySelector(x);
          return Promise.resolve(element ? element.innerHTML : "");
        }, this.config.selectors.user_unfollow_button);

        if (followStatus === "Following") {
          console.log("DEJE DE SEGUIR A ..." + user);
          //click on unfollow button
          await this.page.click(this.config.selectors.user_unfollow_button);
          //wait for a sec
          await this.page.waitFor(this.randomWait(5250));
          //confirm unfollow user
          await this.page.click(
            this.config.selectors.user_unfollow_confirm_button
          );
          //wait for random amount of time
          await this.page.waitFor(this.randomWait(1250));
          //save user to following history
          await this.firebase_db.unFollow(user);
        } else {
          //save user to our following history
          this.firebase_db.unFollow(user);
        }
      }
    }
  }

  async closeBrowser() {
    await this.browser.close();
  }
}
module.exports = InstagramBot;
