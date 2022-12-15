import { Route, Routes } from 'react-router';
import Form from './components/Form';

function App() {
    return (
        <Routes>
            <Route path="/reset-password" element={<Form />} />
        </Routes>
    );
}

export default App;
