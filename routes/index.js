var express = require('express');
var router = express.Router();
var exec  = require('child_process').execSync;
var spawn = require('child_process').spawn;

var canbusChild = {};
var modbusChild = {
    modbusPort : 1502,
    registers : []
};


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(modbusChild.registers);
  res.render('index', {
    title: 'Modbus and Canbus Testing Interface',
    data : {
        registers : modbusChild.registers
    }
  });
});

router.get("/startCanbus", function(req, res, next){
    canbusChild["interface"] = req.query["interface"];
    exec('candump ' +  canbusChild.interface + ' -n 1' ,
        function(error, stdout, stderr){
            res.send(stdout);
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null){
                console.log("Error executing... ",error)
            }
        }
    );

});
router.get("/startModbus", function(req, res, next){

    modbusChild["modbusIp"] = req.query["modbusIp"];

    var stdout = exec('modpoll ' + modbusChild.modbusIp + ' -p ' + modbusChild.modbusPort + ' -1 -c 40');
    var modbusRegisters = stdout.toString().split('\n').slice(10);
    modbusChild.registers = modbusRegisters;
    console.log(modbusRegisters);
    res.render('index', {
        title : "Modbus and Canbus Testing Interface",
        data : {
            registers: modbusRegisters
        }
    })
});


module.exports = router;
