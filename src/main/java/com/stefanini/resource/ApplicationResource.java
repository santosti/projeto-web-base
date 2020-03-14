package com.stefanini.resource;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.UserTransaction;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import com.stefanini.model.Endereco;
import com.stefanini.model.Pessoa;

@ApplicationPath("api")
public class ApplicationResource extends Application {
	
	EntityManager entityManager;
	
	EntityManagerFactory entityManagerFactory;

	public static void main(String[] args) {

		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("jpa");
		EntityManager entityManager = entityManagerFactory.createEntityManager();

		ConsultarUf(entityManager);

		// entityManager.close();
		// entityManagerFactory.close();

	}

	@Resource
	private UserTransaction userTransaction;

	public static void ConsultarUf(EntityManager entityManager) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

		CriteriaQuery<Endereco> criteriaQuery = criteriaBuilder.createQuery(Endereco.class);
		Root<Endereco> root = criteriaQuery.from(Endereco.class);

		criteriaQuery.select(root);
		criteriaQuery.where(criteriaBuilder.equal(root.get("uf"), "DF"));

		TypedQuery<Endereco> typedQuery = entityManager.createQuery(criteriaQuery);

		List<Endereco> lista = typedQuery.getResultList();
		lista.forEach(u -> System.out.println(u.getIdPessoa() + "," + u.getUf()));

		// Endereco endereco = typedQuery.getSingleResult();
		// System.out.println(endereco.getUf() + "," + endereco.getUf());

	}

	// Método para adicionar pessoa no banco
	public void addPessoa() throws Exception {
		Pessoa pessoa = new Pessoa("Simone", "Simonne@hotmail.com", new Date(1995 - 06 - 04), true);
		userTransaction.begin();
		entityManager.persist(pessoa);
		userTransaction.commit();
	}

}
