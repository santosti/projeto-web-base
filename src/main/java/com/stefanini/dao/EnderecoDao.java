package com.stefanini.dao;

import java.util.List;

import com.stefanini.dao.abstracao.GenericDao;
import com.stefanini.model.Endereco;

/**
 * O Unico objetivo da Dao 
 * @author joaopedromilhome
 *
 */
public class EnderecoDao extends GenericDao<Endereco, Long> {

	public EnderecoDao() {
		super(Endereco.class);
	}
	
//	Filtro
//	public List<Endereco> getList(String uf) {
//		return getEntityManager().createNamedQuery("Endereco.findByEnderecoUf").setParameter("uf", uf).getResultList();
//	}
	

}
