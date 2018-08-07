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

  export function chatDisplay()
  {      const createResultTemplateTxt = 
    `<div class="d-flex flex-row mt-2" style="height:240px;width:440px;overflow:auto;">
	<ul class="nav nav-tabs nav-tabs--vertical nav-tabs--left sticky-offset" role="navigation">
    <li class="nav-item">
    <a href="#" role="tab" class="text-dark"><b>Channels</b></a>
    </li>
       <li class="nav-item">
			<a href="#channel1" class="nav-link active" data-toggle="tab" role="tab" aria-controls="Channel1">Channel1</a>
		</li>
		<li class="nav-item">
			<a href="#channel2" class="nav-link" data-toggle="tab" role="tab" aria-controls="Channel2">Channel2</a>
        </li>
        <li class="nav-item">
    <a href="#" role="tab" class="text-dark"><b>Direct Messages</b></a>
    </li>
		<li class="nav-item">
			<a href="#userA" class="nav-link disabled" data-toggle="tab" role="tab" aria-controls="userA">userA</a>
		</li>
		<li class="nav-item">
			<a href="#userB" class="nav-link" data-toggle="tab" role="tab" aria-controls="userB">userB</a>
		</li>
	</ul>
	<div class="tab-content">
		<div class="tab-pane fade show active" id="channel1" role="tabpanel">			
            <p>userA  (21/08/87 8.00PM): Aenean purus pharetra dictum.</p>
            <p>userB  (21/08/87 8.03PM): Chekcing msgs purus pharetra dictum.</p>
		</div>
		<div class="tab-pane fade" id="channel2" role="tabpanel">		
            <p>userB (2/08/87 8.00PM): Aenean purus pharetra dictum.</p>
            <p>userC (2/08/87 8.03PM): Chekcing msgs purus pharetra dictum.</p>
        </div>
		<div class="tab-pane fade" id="userA" role="tabpanel">
            <p>userF (2/08/87 8.00PM): Aenean purus pharetra dictum.</p>
            <p>userC (2/08/87 8.03PM): Chekcing msgs purus pharetra dictum.</p>
        </div>
        <div class="tab-pane fade" id="userB" role="tabpanel">
            <p>userF (2/08/87 8.00PM): Aenean purus pharetra dictum.</p>
            <p>userC (2/08/87 8.03PM): Chekcing msgs purus pharetra dictum.</p>            
        </div>
	</div>
</div>`;
return createHTMLElement(createResultTemplateTxt);
  }

  
