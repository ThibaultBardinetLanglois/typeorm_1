import events from "events";
 
let helloEvent = new events.EventEmitter();
 
 
export const sayHelloEvent = helloEvent.on('coucou', function(name: string){
    console.log(`\nHello ${name}, now we can trigger asynchronous call thanx to events, here i can call a function to send you an email foor example`);
})
