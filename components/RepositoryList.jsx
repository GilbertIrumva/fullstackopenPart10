import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: '#e1e4e8',
  },

  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#586069',
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },

  selector: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#586069',
    borderRadius: 4,
    padding: 12,
  },

  selectorText: {
    fontSize: 16,
  },

  options: {
    marginTop: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#586069',
    borderRadius: 4,
  },

  option: {
    padding: 12,
  },

  optionText: {
    fontSize: 16,
  },

  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sort, setSort] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [debouncedSearchKeyword] = useDebounce(
    searchKeyword,
    500
  );

  const { repositories, loading, error } = useRepositories({
    ...sort,
    searchKeyword: debouncedSearchKeyword,
  });

  const navigate = useNavigate();

  const sortingOptions = [
    {
      label: 'Latest repositories',
      value: {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      },
    },
    {
      label: 'Highest rated repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      },
    },
    {
      label: 'Lowest rated repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      },
    },
  ];

  const selectedOption =
    sortingOptions.find(
      (option) =>
        option.value.orderBy === sort.orderBy &&
        option.value.orderDirection === sort.orderDirection
    ) || sortingOptions[0];

  const handleSelect = (option) => {
    setSort(option.value);
    setMenuOpen(false);
  };

  if (loading) {
    return <View />;
  }

  if (error) {
    console.error(error);
    return <View />;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            placeholder="Search repositories"
            autoCapitalize="none"
          />

          <Pressable
            style={styles.selector}
            onPress={() => setMenuOpen(!menuOpen)}
          >
            <Text style={styles.selectorText}>
              {selectedOption.label}
            </Text>
          </Pressable>

          {menuOpen && (
            <View style={styles.options}>
              {sortingOptions.map((option) => (
                <Pressable
                  key={option.label}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={styles.optionText}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repositories/${item.id}`)}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;