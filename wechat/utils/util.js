const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const stringFormat = function(str, args){
  var result = str;
  if (args.length > 0) { 
    for (var i = 0; i < args.length; i++) {
        if (args[i] != undefined) {
            //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
　　　　　　　　　　　　var reg= new RegExp("({)" + i + "(})", "g");
            result = result.replace(reg, args[i]);
        }
    }
  }
  return result;
}


module.exports = {
  formatTime: formatTime,
  stringFormat: stringFormat
}
