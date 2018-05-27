//连接服务器 默认使用websocket
var wbsocket = io();

var i = 0;
//创建vue实例
var app = new Vue({
  el: '#app',
  data: {
    seen: true,
    show: false,
    messageInput:"What's your nick name?",
    message:'',
    messages:[''], 
  },
  watch:{
    messageInput: function(){
      this.printt();
    }
  },
  methods: {
      printt: function() {
        console.log(this.messageInput);
      },
      leave: function() {
        this.seen = !this.seen;
      },
      pressEnter: function() {
        if(i == 0){
          username = this.messageInput.toString();
          this.messageInput = '';
          wbsocket.emit('add user',username);
          i ++;
        }else{
          this.messages.push(this.messageInput.toString());
          this.messageInput = '';
          wbsocket.emit('new message',this.messages[this.messages.length - 1]);
          this.show = true;
        }
      },
      clean: function(){
        this.messageInput = '';
      }
  }
});


//如果收到‘w’通道的消息,则调用回调
wbsocket.on('login', function(data){
  console.log(data);
  wbsocket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

wbsocket.on('user joined',(data) => {
  console.log(data);
})

wbsocket.on('new message',(data) => {
  console.log(data);
  app.messages.push(data.username + ':'+ data.message);
  app.show = true;
})


// app.$watch('messageInput', function (newValue, oldValue) {
//   console.log(oldValue);
//   console.log(newValue);
//   // 这个回调将在 `vm.a` 改变后调用
// });



