export const api = {
  viaCep: async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        console.log('Cep Invalido')
      }

      return data
    } catch (err) {
      console.log(err)
    }
  },
}
