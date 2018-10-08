package com.okta.developer.repository.search;

import com.okta.developer.domain.Weight;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Weight entity.
 */
public interface WeightSearchRepository extends ElasticsearchRepository<Weight, Long> {
}
