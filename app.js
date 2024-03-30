const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', { text: 'this is EJS' })
})

app.get('/about', (req, res) => {
    res.render('about', { text: 'About Page' })
})


app.listen(port, () => console.log(`Server is running on port ${port}`))

