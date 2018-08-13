function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  function tabDisplay(src)
  {     
    const srcTab=`<li class="nav-item"><a data-toggle="pill" class="nav-link" href="#${src}">${src}</a></li>`;
    return createHTMLElement(srcTab);

  }

  function tabContentDisplay(src, msg)
  {
     let srcContentDisplay;
    if(Array.isArray(msg)) {          
      srcContentDisplay =`<div class="tab-pane fade" id="${src}" role="tabpanel">
    ${msg.map(item => `<p><small> ${item} </small></p>`).join('')} </div>`; 
  }
    return createHTMLElement(srcContentDisplay);

  }

  function displayUserChat(user, msg)
  {
      document.getElementById('userTab').appendChild(tabDisplay(`${user}`));
      document.getElementById('userContent').appendChild(tabContentDisplay(`${user}`,msg));
  }
  function displayChannelsChat(channel, msg)
  {
      document.getElementById('channelTab').appendChild(tabDisplay(`${channel}`));
      document.getElementById('channelContent').appendChild(tabContentDisplay(`${channel}`,msg));
  }
 
  export {displayUserChat,displayChannelsChat};
