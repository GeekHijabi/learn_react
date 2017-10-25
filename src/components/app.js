import React from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import Fish from './fish';
import sampleFishes from '../sample-fishes'; 
import base from '../base'

class App extends React.Component {

    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.deleteFish = this.deleteFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.deleteFromOrder = this.deleteFromOrder.bind(this);
        
        this.state = {
            fishes: {},
            order: {}
        };
    }
    // lifecycle starts here
    componentWillMount() {
        // runs before app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        });

        // check if the localStorage is ordered
        const localStorageRef = localStorage.getItem(
            `order-${this.props.params.storeId}`)

        if(localStorageRef) {
            // update app component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, 
        JSON.stringify(nextState.order));

    }
    // life cycle ends



    // create state
    addFish(fish){
        //update state
        const fishes = {...this.state.fishes}; //... is meant to create a copy of your prev state
        //add new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({fishes: fishes})
    }
    
    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    deleteFish(key) {
        const fishes = {...this.state.fishes}
        fishes[key] = null;
        this.setState({ fishes })
    }

    loadSamples(){
        console.log('Available fishes')
        this.setState({
            
            fishes: sampleFishes
         });
    }

    addToOrder(key){
        //make a copy
        const order = {...this.state.order};
        //update or add new fish
        order[key] = order[key] + 1 || 1;
        //update state
        this.setState({order: order}); //order
    }

    deleteFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    // end state creation


    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                              .keys(this.state.fishes)
                              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                    

                </div>
                <Order fishes={this.state.fishes} 
                       order={this.state.order} 
                       params={this.props.params}
                       deleteFromOrder={this.deleteFromOrder}
                       />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} 
                    fishes={this.state.fishes} updateFish={this.updateFish} 
                    deleteFish={this.deleteFish}/>
            </div>
        )
    }

}

App.propTypes = {
     params: React.PropTypes.object.isRequired
}
export default App;