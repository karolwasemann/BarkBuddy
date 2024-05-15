import React, { Component } from 'react';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  VStack,
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
type SelectBreedProps = {
  onSelectBreed: (value: string) => void;
  defaultValue: string;
};
import breeds from '../data/breeds.json';
import theme from '../theme';
export default function SelectBreed({
  onSelectBreed,
  defaultValue,
}: SelectBreedProps) {
  return (
    <VStack w="$full">
      <Select
        selectedValue={defaultValue}
        onValueChange={(e) => onSelectBreed(e)}
      >
        <SelectTrigger
          variant="outline"
          size="md"
          pr="$3"
          borderColor={theme.colors.accent}
        >
          <SelectInput placeholder="Select Dog Breed" />
          <SelectIcon>
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <ScrollView>
              {breeds.map((breed, i) => (
                <SelectItem
                  key={`${breed.breed}-${i}`}
                  label={breed.breed}
                  value={breed.breed}
                />
              ))}
            </ScrollView>
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  );
}
