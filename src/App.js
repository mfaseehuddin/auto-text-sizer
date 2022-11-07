import AutoText from './components/AutoText/AutoText';

function App() {
    return (
        <div className="App">
            <div
                className="App"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <AutoText uwidth={"50vw"}>
                    Lorem ipsum dolor sit amet <br />
                    consectetur adipiscing elit <br />
                    sed do eiusmod tempor
                </AutoText>
            </div>
        </div>
    );
}

export default App;
