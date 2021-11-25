import * as Yup from 'yup';

export default Yup.object().shape({
  key_result: Yup.string().min(2).required(),
  frequency: Yup.string().min(2).required(),
  
  
})