const app = require('./src/config/custom-express');

const PORT = 3000;
app.listen(PORT, () => {
    console.log('[INFO] Server is running on port', PORT);
});
