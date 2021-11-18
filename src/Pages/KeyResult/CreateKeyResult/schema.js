import * as Yup from 'yup';

export default Yup.object().shape({
  key_result: Yup.string().min(2).required(),
  comment: Yup.string().min(3),
  frequency: Yup.string().min(2).required(),
  
  
})