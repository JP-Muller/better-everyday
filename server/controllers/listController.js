let id = 7

let list = [
    {
        id: 1,
        date: 'Mon June 3 2019',
        completedTasks: ['Start DevMountain', 'Unpack', 'Study GitHub', 'Sleep'],
        entry: 'Today was great, I started DevMountain and made some new friends.',
        imageOfDay: 'https://media1.tenor.com/images/c815396f481f2e27a36f48149cfe27c4/tenor.gif?itemid=10889686'
    },
    {
        id: 2,
        date: 'Thurs June 6 2019',
        completedTasks: ['Learn JavaScript', '40 push-ups', 'Buy a bike'],
        entry: 'Today was cool, I learned a lot about JavaScript! I also had to buy a bike, but it will be well worth it.',
        imageOfDay: 'https://media1.tenor.com/images/c815396f481f2e27a36f48149cfe27c4/tenor.gif?itemid=10889686'
    },
    {
        id: 3,
        date: 'Fri June 14 2019',
        completedTasks: ['Learn HTML', 'Bike to grocery store'],
        entry: 'Today was great, I learned a lot about HTML!',
        imageOfDay: 'https://media1.tenor.com/images/c815396f481f2e27a36f48149cfe27c4/tenor.gif?itemid=10889686'
    },
    {
        id: 4,
        date: 'Thu June 20 2019',
        completedTasks: ['Learn more node', 'Study'],
        entry: 'Looking forward to learning more',
        imageOfDay: 'https://media1.tenor.com/images/c815396f481f2e27a36f48149cfe27c4/tenor.gif?itemid=10889686'
    },
    {
        id: 5,
        date: 'Fri June 28 2019',
        completedTasks: ['Study express endpoints', 'Go grocery shopping', 'Kill it'],
        entry: 'Today was a good day. I made more progress on my noDb project.',
        imageOfDay: 'https://media1.tenor.com/images/c815396f481f2e27a36f48149cfe27c4/tenor.gif?itemid=10889686'
    },
    {
        id: 6,
        date: 'Sat June 29 2019',
        completedTasks: ['Work on CRUD', 'Go on a bike ride'],
        entry: 'Today was good. I added more functionality to my project.',
        imageOfDay: 'https://media1.tenor.com/images/c815396f481f2e27a36f48149cfe27c4/tenor.gif?itemid=10889686'

    }

]

module.exports = {
    dailyEntries(req, res) {
        console.log('hit dailyEntries data')
        res.status(200).send(list)
    },

    updateItem(req, res) {
        console.log('hit update')
        let { id } = req.params
        let { newThought } = req.query
        let index = list.findIndex(entries => entries.id === +id)
        list[index].thought = newThought
        res.status(200).send(list)
    },
    addItem(req, res) {
        console.log('hit addItem')
        const { date, completedTasks, entry, imageOfDay } = req.body

        let newEntry = {
            id,
            date,
            completedTasks,
            entry,
            imageOfDay
        }

        list.push(newEntry)
        id++

        res.status(200).send(list)
    },

    deleteEntry(req, res) {
        console.log('hit delete')
        let { id } = req.params
        console.log({ id })
        let index = list.findIndex(list => list.id === +id);
        index !== -1 && list.splice(index, 1);
        res.status(200).send(list)
    },
    //// DB DB DB DB DB 

    async getPosts(req, res) {
        let { userId } = req.params
        const db = req.app.get('db')
        let posts = await db.get_posts_by_user(+userId)
        console.log('hit get posts by user!!!')
        res.send(posts)
    },
    async deletePost(req, res) {
        let { postId } = req.params
        const db = req.app.get('db')
        let posts = await db.delete_post([+postId,
        req.session.user.id])
        console.log('hit delete post!!!!!');
        res.send(posts)
    },
    async editPost(req, res) {
        let { postId } = req.params
        let { newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5 } = req.body
        const db = req.app.get('db')
        let posts = await db.edit_post([
            postId,
            newEntry,
            newImage,
            newTask1,
            newTask2,
            newTask3,
            newTask4,
            newTask5,
            req.session.user.id

        ])
        res.send(posts)
    },
    async editPostImage(req, res) {
        let { postId } = req.params
        let { newImage } = req.body
        const db = req.app.get('db')
        let posts = await db.edit_post_image([postId, newImage, req.session.user.id])
        res.send(posts)
    },
    async editPostEntry(req, res) {
        let { postId } = req.params
        let { newEntry } = req.body
        const db = req.app.get('db')
        let posts = await db.edit_post_entry([postId, newEntry, req.session.user.id])
        res.send(posts)

    },
    async savePost(req, res) {
        let { task1, task2, task3, task4, task5, entry, date, imageOfDay, mood } = req.body
        const db = req.app.get('db')
        let posts = await db.add_post([task1, task2, task3, task4, task5, entry, date, imageOfDay, mood, req.session.user.id])
        console.log('hit Save Post!!!...')
        res.send(posts)
    },
    async getAllPublic(req, res) {
        const db = req.app.get('db')
        let posts = await db.get_all_public_posts()
        console.log('GOT ALL PUBLIC POSTS');
        res.send(posts)
    },
    async setPublic(req,res){
        let {postId} = req.params
        const db = req.app.get('db')
        let posts = await db.set_post_public([postId, req.session.user.id])
        res.send(posts)
    },
    async setPrivate(req,res){
        let {postId} = req.params
        const db = req.app.get('db')
        let posts = await db.set_post_private([postId, req.session.user.id])
        res.send(posts)
    }

}

//need to add task items to this for complete post