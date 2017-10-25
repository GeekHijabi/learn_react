import React from 'react';
import {getFunName} from '../helpers'

class StorePicker extends React.Component{

    goToStore(event) {
        event.preventDefault(); 
      const storeId = this.storeInput.value
      //get text from the box
      //change url to the text in the box
      this.context.router.transitionTo(`/store/${storeId}`);
    }    


    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
            {/*<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>*/}
                <h2>Please input a Store name</h2>
                {/*place ypur comment*/}
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} 
                ref={(input) => {this.storeInput = input}}/>
                <button type="submit"> Visit Store</button>

            </form>
        )
    }

}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

           

   
export default StorePicker
