let quotes = []

module.exports = {
    grabQuotes(req, res) {
        console.log('pulled quotes')
        res.status(200).send(quotes)
    },
}