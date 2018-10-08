package com.okta.developer.repository.search;

import com.okta.developer.domain.BloodPressure;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the BloodPressure entity.
 */
public interface BloodPressureSearchRepository extends ElasticsearchRepository<BloodPressure, Long> {
}
