function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }


  function tabDisplay(src)
  { 
    /*const srcTab=`<li class="nav-item">
    <a href="#${src}" class="nav-link text-secondary" data-toggle="tab" role="tab" aria-controls="${src}">${src}</a>
    </li>`; */
    const srcTab=`<li class="nav-item"><a data-toggle="pill" class="nav-link" href="#${src}">${src}</a></li>`;
    return createHTMLElement(srcTab);

  }
  function tabContentDisplay(src, msg)
  { let srcContentDisplay;
    console.log('--------aray check----',typeof msg, "---------",msg);
    if(Array.isArray(msg)) {          
      srcContentDisplay =`<div class="tab-pane fade" id="${src}" role="tabpanel">
    ${msg.map(item => `${item}`).join('')} </div>`; 
  }
  /*srcContentDisplay =`<div class="tab-pane fade" id="${src}" role="tabpanel">
  ${msg} </div>`; */
    return createHTMLElement(srcContentDisplay);

  }

  function displayUserChat(user, msg)
  {
      document.getElementById('userTab').appendChild(tabDisplay(`${user}`));
      document.getElementById('userContent').appendChild(tabContentDisplay(`${user}`,msg));
     // $('#userTab').metisMenu();
  }
  function displayChannelsChat(channel, msg)
  {
      document.getElementById('channelTab').appendChild(tabDisplay(`${channel}`));
      document.getElementById('channelContent').appendChild(tabContentDisplay(`${channel}`,`${msg}`));
     
    }
 
 

  export {displayUserChat,displayChannelsChat};
