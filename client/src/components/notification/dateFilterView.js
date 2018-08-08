function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }
  function createSearchResult(user,text) {
    const createResultTemplateTxt = `<div class="border container tab-pane" aria-labelledby="pills-home-tab" id="createRepo">
  <button type="button" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  <div class="card card-body" role="tabpanel" aria-labelledby="pills-home-tab" style="content: \e003">
  <form>
  <div class="form-group row">      
          <div class="col-md-3">
              <output>${user}</output>
          </div>
      </div>
      <div class="form-group row">
           <div class="col-md-3">
          <output>${text}</output>
          </div>
      </div>  
  </form>
  </div>
  </div>`;
  
    return createHTMLElement(createResultTemplateTxt);
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
