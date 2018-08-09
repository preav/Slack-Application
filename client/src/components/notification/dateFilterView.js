function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  function tabDisplay(src)
  {
    const srcTab=`<li class="nav-item">
    <a href="#${src}" class="nav-link text-secondary" data-toggle="tab" role="tab" aria-controls="${src}">${src}</a>
    </li>`; 
    return createHTMLElement(srcTab);

  }
  function tabContentDisplay(src, msg)
  {
    const srcContentDisplay=`<div class="tab-pane fade" id="${src}" role="tabpanel">
    <p>${msg}</p>           
 </div>`; 
    return createHTMLElement(srcContentDisplay);

  }

  function displayUserChat(user, msg)
  {
      document.getElementById('userTab').appendChild(tabDisplay(`${user}`));
      document.getElementById('channelContent').appendChild(tabContentDisplay(`${user}`,`${msg}`));
  }
  function displayChannelsChat(channel, msg)
  {
      document.getElementById('channelTab').appendChild(tabDisplay(`${channel}`));
      document.getElementById('channelContent').appendChild(tabContentDisplay(`${channel}`,`${msg}`));
     
    }
 
 

  export {displayUserChat,displayChannelsChat};
