import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "local",
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  cluster: "mt1",
});
