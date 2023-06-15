import Notes from './Notes';

const Home = (props) => {
    return (
        <div>
            <div className="conatiner my-3">
                <Notes showAlert={props.showAlert}/>
            </div>
        </div>
    );
}

export default Home;