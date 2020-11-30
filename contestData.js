const fs = require('fs');

module.exports = {
    getData : function() {
        return JSON.parse(fs.readFileSync('contestData.txt'));
    },

    setData : function(data) {
        fs.writeFile('contestData.txt', JSON.stringify(data), (err) => {
            console.err('Unable to save data (' + err + '). Dumping data to console for recovery');
            console.log(JSON.stringify(data));
        })
    }

}