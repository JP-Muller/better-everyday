const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
  async login(req, res) {
    let { username, password } = req.body;
    const db = req.app.get('db');
    let [existingUser] = await db.get_user_by_username(username);
    if (!existingUser) return res.status(401).send('Username not found');
    let result = await bcrypt.compare(password, existingUser.password);
    if (result) {
      req.session.user = {
        username: existingUser.username,
        id: existingUser.id,
        firstName: existingUser.first_name,
        lastName: existingUser.last_name,
        email: existingUser.email,
        loggedIn: true,
        xp: existingUser.xp,
        level: existingUser.level,
        score_streak: existingUser.score_streak,
        image: existingUser.image,
        streak_block: existingUser.streak_block,
        posted_today: existingUser.posted_today,
        last_date_posted: existingUser.last_date_posted,
        highest_streak: existingUser.highest_streak
      };
      res.send(req.session.user);
    } else res.status(401).send('Username or password incorrect');
  },
  async signup(req, res) {
    let { firstName, lastName, email, username, password } = req.body;
    const db = req.app.get('db');
    let [existingUser] = await db.get_user_by_username(username);
    if (existingUser) return res.status(400).send('Username exists already');
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    let [user] = await db.create_user([firstName, lastName, email, username, hash]);
    req.session.user = {
      username: user.username,
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      loggedIn: true,
      xp: user.xp,
      level: user.level,
      score_streak: user.score_streak,
      image: user.image,
      streak_block: user.streak_block,
      posted_today: user.posted_today,
      last_date_posted: user.last_date_posted,
      highest_streak: user.highest_streak
    };
    console.log('req.session.user', req.session.user)
    res.send(req.session.user);
  },
  logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser(req, res) {
    res.send(req.session.user);
  },
  async updateProfileImage(req, res) {
    let { newProfileImage } = req.body
    const db = req.app.get('db')
    let user = await db.update_profile_image([newProfileImage, req.session.user.id])
    res.send(user)
  },
  async levelUp(req, res) {
    const db = req.app.get('db')
    let user = await db.level_up(req.session.user.id)
    console.log(user)
    res.send(user)
  },
  async addToStreak(req, res) {
    let {date} = req.body
    const db = req.app.get('db')
    let user = await db.add_to_streak([req.session.user.id, date])
      .catch(err => console.log('addToStreak Error UC', err))
    res.send(user)
  },
  async removeStreak(req, res) {
    const db = req.app.get('db')
    let user = await db.remove_streak(req.session.user.id)
    res.send(user)
  },
  async streakBlockerOn(req, res) {
    const db = req.app.get('db')
    let user = await db.streak_block_on(req.session.user.id)
    res.send(user)
  },
  async switchPostedOff(req, res) {
    const db = req.app.get('db')
    let data = await db.posted_today_off(req.session.user.id)
    console.log('POSTED TODAY OFF')
    res.send(data)
  },
  async switchPostedOn(req, res) {
    const db = req.app.get('db')
    let data = await db.posted_today_on(req.session.user.id)
    console.log('POSTED TODAY ON')
    res.send(data)
  },
  async streakBlockerOff(req, res) {
    const db = req.app.get('db')
    let user = await db.streak_block_off(req.session.user.id)
      .catch(err => console.log('error', err))
    console.log(user);
    res.send(user)
  },
  async changeActivity(req, res) {
    let { today } = req.body
    const db = req.app.get('db')
    let user = await db.change_activity([req.session.user.id, today])
      .catch(err => console.log('error', err))
    res.send(user)
  },
  async getScores(req, res) {
    const db = req.app.get('db')
    let user = await db.get_user_scores(req.session.user.id)
    res.send(user)
  },
  async adminGetAllPosts(req, res) {
    const db = req.app.get('db')
    let user = await db.admin_get_all()
    res.send(user)
  }
};

