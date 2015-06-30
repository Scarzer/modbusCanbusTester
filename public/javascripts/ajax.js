/**
 * Created by scarzer on 6/29/15.
 */


$(function(){
    $('#startCanbus').on("click", function(e){
        console.log("Start the Canbus!");
        var interface = $('#canbusDevice').val() ;
        if(interface == "") interface = "vcan0";
        $.ajax({
            url: "/startCanbus",
            type: "GET",
            data: { interface : interface},
            success : function(data){
                console.log("Recieved: " + JSON.stringify(data));
            }
        });
    })
});

$(function(){
    $('#startModbus').on("click", function(e){
        console.log("Start the Modbus!");
        var modbusIp = $('#modbusIp').val();
        if(modbusIp == "") modbusIp = "0.0.0.0";
        console.log(modbusIp);
        $.ajax({
            url: "/startModbus",
            type: "GET",
            data: {modbusIp : modbusIp},
            done: function(){
                window.location.href = "/"
            }
        });
    })
});
