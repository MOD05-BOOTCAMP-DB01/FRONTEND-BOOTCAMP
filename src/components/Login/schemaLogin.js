import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().min(8).email('Esse e-mail não é valido.'),

  password: Yup.string().required('Digite uma senha').min(8, 'A senha deve conter pelo menos 8 caracteres.').matches(/[a-z]/, 'Senha deve conter pelo menos uma letra uma minuscula.').matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra mauiscula.').matches(/[#?!@$%^&*-]/, 'Senha deve conter caracteres special.')
  
  
})