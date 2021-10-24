export const Header = (props) => {
  const {user} = props;
  console.log("user in header", props);
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {'FARMER\'S ASSISTANT'}
                  <span></span>
                </h1>
                <p>{'Plan farming with our tools and increase your crop productivity!'}</p>
                
                <a
                  href='/visualise'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  {user ? `Get Data` : `Learn More`}
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
