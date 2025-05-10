# React Native Paper Components

This document provides an overview of the UI components available from the React Native Paper library that are used in the Crypto Tracker App. React Native Paper is a Material Design implementation for React Native that provides a consistent and customizable UI experience.

## Installation

React Native Paper is already installed in the project. It was set up with:

```bash
npm install react-native-paper react-native-safe-area-context
```

For iOS, the native parts of the library were linked with:

```bash
npx pod-install
```

## Available Components

The following components are available from React Native Paper and can be used in the application:

### Core Components

#### ActivityIndicator
A circular loading indicator that follows Material Design guidelines.
```jsx
import { ActivityIndicator } from 'react-native-paper';

<ActivityIndicator animating={true} color="#663399" />
```

#### Appbar
A top app bar that can contain navigation icons, titles, and actions.
```jsx
import { Appbar } from 'react-native-paper';

<Appbar.Header>
  <Appbar.BackAction onPress={() => {}} />
  <Appbar.Content title="Crypto Tracker" />
  <Appbar.Action icon="magnify" onPress={() => {}} />
</Appbar.Header>
```

#### Avatar
Avatars can be used to represent people or objects.
```jsx
import { Avatar } from 'react-native-paper';

<Avatar.Icon size={24} icon="folder" />
<Avatar.Image size={48} source={require('../assets/avatar.png')} />
<Avatar.Text size={36} label="BTC" />
```

#### Badge
Badges can be used to show a small status indicator.
```jsx
import { Badge } from 'react-native-paper';

<Badge>3</Badge>
```

#### Banner
Banners display important, succinct messages, and provide actions that users can take.
```jsx
import { Banner } from 'react-native-paper';

<Banner
  visible={true}
  actions={[
    {
      label: 'Fix it',
      onPress: () => {},
    },
    {
      label: 'Learn more',
      onPress: () => {},
    },
  ]}
>
  There was a problem processing a transaction on your credit card.
</Banner>
```

#### BottomNavigation
Bottom navigation provides quick navigation between top-level views of an app.
```jsx
import { BottomNavigation } from 'react-native-paper';

<BottomNavigation
  navigationState={{ index, routes }}
  onIndexChange={setIndex}
  renderScene={renderScene}
/>
```

#### Button
Buttons communicate actions that users can take.
```jsx
import { Button } from 'react-native-paper';

<Button mode="contained" onPress={() => {}}>
  Press me
</Button>
```

#### Card
Cards contain content and actions about a single subject.
```jsx
import { Card } from 'react-native-paper';

<Card>
  <Card.Title title="Card Title" subtitle="Card Subtitle" />
  <Card.Content>
    <Text variant="bodyMedium">Card content</Text>
  </Card.Content>
  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  <Card.Actions>
    <Button>Cancel</Button>
    <Button>Ok</Button>
  </Card.Actions>
</Card>
```

#### Checkbox
Checkboxes allow the user to select one or more items from a set.
```jsx
import { Checkbox } from 'react-native-paper';

<Checkbox
  status={checked ? 'checked' : 'unchecked'}
  onPress={() => {
    setChecked(!checked);
  }}
/>
```

#### Chip
Chips are compact elements that represent an input, attribute, or action.
```jsx
import { Chip } from 'react-native-paper';

<Chip icon="information" onPress={() => {}}>
  Example Chip
</Chip>
```

#### DataTable
Data tables display sets of data across rows and columns.
```jsx
import { DataTable } from 'react-native-paper';

<DataTable>
  <DataTable.Header>
    <DataTable.Title>Dessert</DataTable.Title>
    <DataTable.Title numeric>Calories</DataTable.Title>
  </DataTable.Header>

  <DataTable.Row>
    <DataTable.Cell>Frozen yogurt</DataTable.Cell>
    <DataTable.Cell numeric>159</DataTable.Cell>
  </DataTable.Row>
</DataTable>
```

#### Dialog
Dialogs inform users about a task and can contain critical information or require decisions.
```jsx
import { Dialog, Portal } from 'react-native-paper';

<Portal>
  <Dialog visible={visible} onDismiss={hideDialog}>
    <Dialog.Title>Alert</Dialog.Title>
    <Dialog.Content>
      <Text variant="bodyMedium">This is simple dialog</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={hideDialog}>Done</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>
```

#### Divider
A divider is a thin line that groups content in lists and layouts.
```jsx
import { Divider } from 'react-native-paper';

<Divider />
```

#### Drawer
The Drawer is a panel that displays the app's main navigation options on the left edge of the screen.
```jsx
import { Drawer } from 'react-native-paper';

<Drawer.Section title="Some title">
  <Drawer.Item
    label="First Item"
    active={active === 'first'}
    onPress={() => setActive('first')}
  />
  <Drawer.Item
    label="Second Item"
    active={active === 'second'}
    onPress={() => setActive('second')}
  />
</Drawer.Section>
```

#### FAB (Floating Action Button)
A floating action button represents the primary action in an application.
```jsx
import { FAB } from 'react-native-paper';

<FAB
  icon="plus"
  style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
  onPress={() => {}}
/>
```

#### HelperText
Helper text is used in conjunction with input to provide additional information.
```jsx
import { HelperText, TextInput } from 'react-native-paper';

<TextInput label="Email" value={text} onChangeText={setText} />
<HelperText type="error" visible={hasErrors()}>
  Email address is invalid!
</HelperText>
```

#### Icon
Icons are visual indicators usually used to describe action or intent.
```jsx
import { Icon } from 'react-native-paper';

<Icon source="camera" size={20} />
```

#### IconButton
An icon button is a button with only an icon.
```jsx
import { IconButton } from 'react-native-paper';

<IconButton
  icon="camera"
  iconColor="#663399"
  size={20}
  onPress={() => {}}
/>
```

#### List
Lists are continuous, vertical indexes of text or images.
```jsx
import { List } from 'react-native-paper';

<List.Section>
  <List.Subheader>Some title</List.Subheader>
  <List.Item
    title="First Item"
    left={props => <List.Icon {...props} icon="folder" />}
  />
  <List.Item
    title="Second Item"
    left={props => <List.Icon {...props} icon="folder" />}
  />
</List.Section>
```

#### Menu
Menus display a list of choices on temporary surfaces.
```jsx
import { Menu, Button } from 'react-native-paper';

<Menu
  visible={visible}
  onDismiss={closeMenu}
  anchor={<Button onPress={openMenu}>Show menu</Button>}
>
  <Menu.Item onPress={() => {}} title="Item 1" />
  <Menu.Item onPress={() => {}} title="Item 2" />
</Menu>
```

#### Modal
The Modal component is a simple way to present content above an enclosing view.
```jsx
import { Modal, Portal } from 'react-native-paper';

<Portal>
  <Modal visible={visible} onDismiss={hideModal}>
    <Text>Example Modal</Text>
  </Modal>
</Portal>
```

#### Portal
The Portal component renders its children into a different part of the component tree.
```jsx
import { Portal, Text } from 'react-native-paper';

<Portal>
  <Text>This is rendered at a different place</Text>
</Portal>
```

#### ProgressBar
Progress bars indicate the progress of a process.
```jsx
import { ProgressBar } from 'react-native-paper';

<ProgressBar progress={0.5} color="#663399" />
```

#### RadioButton
Radio buttons allow the selection of a single option from a set.
```jsx
import { RadioButton } from 'react-native-paper';

<RadioButton
  value="first"
  status={checked === 'first' ? 'checked' : 'unchecked'}
  onPress={() => setChecked('first')}
/>
```

#### Searchbar
Searchbars are used to search or filter items.
```jsx
import { Searchbar } from 'react-native-paper';

<Searchbar
  placeholder="Search"
  onChangeText={onChangeSearch}
  value={searchQuery}
/>
```

#### SegmentedButtons
Segmented buttons can be used as a toggle for discrete values.
```jsx
import { SegmentedButtons } from 'react-native-paper';

<SegmentedButtons
  value={value}
  onValueChange={setValue}
  buttons={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]}
/>
```

#### Snackbar
Snackbars provide brief messages about app processes at the bottom of the screen.
```jsx
import { Snackbar } from 'react-native-paper';

<Snackbar
  visible={visible}
  onDismiss={onDismissSnackBar}
  action={{
    label: 'Undo',
    onPress: () => {},
  }}
>
  Hey there! I'm a Snackbar.
</Snackbar>
```

#### Surface
Surface is the basic building block for UI elements.
```jsx
import { Surface, Text } from 'react-native-paper';

<Surface style={{ padding: 8 }}>
  <Text>Surface</Text>
</Surface>
```

#### Switch
Switches toggle the state of a single setting on or off.
```jsx
import { Switch } from 'react-native-paper';

<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
```

#### Text
Text component for displaying text with different styles.
```jsx
import { Text } from 'react-native-paper';

<Text variant="displayLarge">Display Large</Text>
<Text variant="headlineMedium">Headline Medium</Text>
<Text variant="bodySmall">Body Small</Text>
```

#### TextInput
TextInput is a component that allows the user to enter text.
```jsx
import { TextInput } from 'react-native-paper';

<TextInput
  label="Email"
  value={text}
  onChangeText={text => setText(text)}
/>
```

#### ToggleButton
Toggle buttons can be used to group related options.
```jsx
import { ToggleButton } from 'react-native-paper';

<ToggleButton
  icon="bluetooth"
  value="bluetooth"
  status={status}
  onPress={onToggleStatus}
/>
```

#### Tooltip
Tooltips display informative text when users hover over, focus on, or tap an element.
```jsx
import { Tooltip, IconButton } from 'react-native-paper';

<Tooltip title="Selected Camera">
  <IconButton icon="camera" selected size={24} onPress={() => {}} />
</Tooltip>
```

#### TouchableRipple
TouchableRipple provides a material "ink ripple" interaction effect for supported platforms.
```jsx
import { TouchableRipple, Text } from 'react-native-paper';

<TouchableRipple
  onPress={() => {}}
  rippleColor="rgba(0, 0, 0, .32)"
>
  <Text>Press anywhere</Text>
</TouchableRipple>
```

## Theming

The application uses a custom theme that integrates with React Navigation. The theme configuration can be found in `src/constants/theme/paperTheme.ts`.

For more information on theming, refer to the [React Native Paper documentation](https://callstack.github.io/react-native-paper/docs/guides/theming).

## References

- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator)
- [Material Design Guidelines](https://material.io/design)