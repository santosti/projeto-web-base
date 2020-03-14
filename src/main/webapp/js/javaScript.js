var baseURL = "http://localhost:8080/treinamento"
	var pessoasURL = "/api/pessoas"
	var enderecosURL = "/api/enderecos"
	var perfisURL = "/api/perfis"
	var pessoasperfisURL = "/api/pessoasperfis"
	var pessoas, enderecos, perfis, pessoasperfis, id = null, pessoa, id1 = null

	function endereco(pessoas) {
		enderecos = {
			cep: document.getElementById("cep").value,
			uf: document.getElementById("uf").value,
			localidade: document.getElementById("localidade").value,
			bairro: document.getElementById("bairro").value,
			complemento: document.getElementById("complemento").value,
			logradouro: document.getElementById("logradouro").value,
			idPessoa: pessoas
		}

		if (pessoas != null) {
			$.ajax({
				url: baseURL + enderecosURL,
				type : "POST",
				data:JSON.stringify(enderecos),
				dataType: 'json',
				contentType: "application/json",
				success : function(result) {
					console.log(result);
					perfil(pessoas);
					// alert("Dados salvos com Sucesso!");

					// window.location.replace(baseURL + enderecosURL);
				},
				error: function(xhr, resp, text) {
					alert("Erro! enderecos");
					console.log(xhr, resp, text);
				}
			});


		}else {
			alert("idPessoa não está vazio!");
		}
	}

	function perfil(pessoas){
		var data = timeConverter();
		console.log(data);

		if(data != null){
			perfis = {
				nome: document.getElementById("nomePerfil").value,
				descricao: document.getElementById("descricao").value,
				dataHoraInclusao: data
			}

			$.ajax({
				url: baseURL + perfisURL,
				type : "POST",
				data:JSON.stringify(perfis),
				dataType: 'json',
				contentType: "application/json",
				success : function(result) {
					console.log(result);
					pessoaperfil(result, pessoas);
					// return result.id;
					// alert("Dados salvos com Sucesso!");

					// window.location.replace(baseURL + perfisURL);
				},
				error: function(xhr, resp, text) {
					alert("Erro! perfis");
					console.log(xhr, resp, text);
				}
			});
		}else {
			alert("Erro ao gerar data!");
		}
	}

	function pessoaperfil(perfil, pessoas){
		pessoasperfis = {
			perfil: perfil,
			pessoa: pessoas
		}

		if (perfil != null && pessoas != null) {
			$.ajax({
				url: baseURL + pessoasperfisURL,
				type : "POST",
				data:JSON.stringify(pessoasperfis),
				dataType: 'json',
				contentType: "application/json",
				success : function(result) {
					console.log(result);
					alert("Dados salvos com Sucesso!");

					// window.location.replace(baseURL + perfisURL);
				},
				error: function(xhr, resp, text) {
					alert("Erro! pessoas perfis");
					console.log(xhr, resp, text);
				}
			});
		}else {
			alert("idPerfil estÃ¡ vazio");
		}
	}

	function timeConverter(){
		var data = new Date();
		data.toLocaleString();
		console.log(data);

	  return data;
	}

	$(document).ready(function(){
      $("#submit").on('click', function(){
					pessoas = {
						nome: document.getElementById("nome").value.toUpperCase(),
						email: document.getElementById("email").value.toLowerCase(),
						dataNascimento: new Date(document.getElementById("dataNascimento").value),
						situacao: document.getElementById("situacao").checked
					}

					if(id == null){
						$.ajax({
							url: baseURL + pessoasURL,
							type : "POST",
							data:JSON.stringify(pessoas),
							dataType: 'json',
							contentType: "application/json",
							success : function(result) {
								console.log(result);
								 endereco(result);
								// alert("Dados salvos com Sucesso!");

								// window.location.replace(baseURL + pessoasURL);
							},
							error: function(xhr, resp, text) {
								alert("Erro! pessoas");
								console.log(xhr, resp, text);
							}
						});
					} else {
						alert("idPessoa não está vazio!");
					}

      });
  });