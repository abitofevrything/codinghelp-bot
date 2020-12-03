const fs = require('fs');

module.exports = {
    getData : function() {
        try {
            let data = JSON.parse(fs.readFileSync('contestdata.txt').toString());
            return data;
        } catch (e) {
            return {
                challenges : [],
                participants : {}
            }
        }
    },

    setData : function(data) {
        fs.writeFile('contestdata.txt', JSON.stringify(data), (err) => {
            if (err) {
                console.errpr('Unable to save data (' + err + '). Dumping data to console for recovery');
                console.log(JSON.stringify(data));
            }
        })
    }

}