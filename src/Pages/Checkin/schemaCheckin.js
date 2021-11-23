import * as Yup from 'yup';

export default Yup.object().shape({
  comment: Yup.string().min(3),
  date: Yup.string().min(2).required(),
  
  
})