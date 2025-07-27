import { useAppTheme } from "@/hooks/useAppTheme";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MenuView } from '@react-native-menu/menu';
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { PressableSurface } from "./PressableSurface";
import { ThemedText } from "./ThemedText";


type CommonProps = {
  label: string;
};

type TextInputField = CommonProps & {
  type: 'text';
  value: string;
  onChangeText: (val: string) => void;
  placeholder?: string,
  onBlur?: ()=>void
} & TextInputProps;

type DateInputField = CommonProps & {
  type: 'date';
  value: Date;
  onChange: (val: Date) => void;
};

type SwitchInputField = CommonProps & {
  type: 'switch';
  value: boolean;
  onChange: (val: boolean) => void;
};

type MenuInputField = CommonProps & {
    type: 'menu';
    options: {label: string, value: string }[];
    value: string;
    onChange: (val: string) => void;
}

type InputFieldProps = (TextInputField | DateInputField | SwitchInputField | MenuInputField) & {
  position?: 'top' | 'middle' | 'bottom' | 'single';
};


export default function InputField(props: InputFieldProps) {
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            backgroundColor: theme.colors.tint,
            height: theme.spacing.xl,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.sm
        },
        });

    const getBorderRadiusStyle = () => {
        switch (props.position) {
            case 'top':
            return { borderTopLeftRadius: theme.borderRadius, borderTopRightRadius: theme.borderRadius };
            case 'bottom':
            return { borderBottomLeftRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius };
            case 'single':
            return { borderRadius: theme.borderRadius };
            default:
            return {}; // middle — no radius
        }
    };

    return (
        <View style={[styles.root, getBorderRadiusStyle()]}>
            <ThemedText variant="regular" size={theme.fontSizes.small} style={{flex: 1}}>{props.label}</ThemedText>

            {props.type === 'text' && (
                <TextInput value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder ?? ''}
                style={{fontFamily: theme.fonts.regular.fontFamily, fontSize: theme.fontSizes.small, flex: 1, textAlign: 'right'}} placeholderTextColor='#888'/>

            )}

            {props.type === 'date' && (
                <DateTimePicker 
                mode="date"
                display='compact'
                textColor='black'
                accentColor="red"
                value={props.value}
                onChange={(event, date) => props.onChange(date ?? new Date())}
                />
            )}

            {props.type === 'menu' && (
                <MenuView
                    title=''
                    onPressAction={({ nativeEvent }) => {
                        console.log(nativeEvent)
                    props.onChange(nativeEvent.event); // `event` is the id you assign below
                    }}
                    actions={props.options.map((option) => ({
                    id: option.value,
                    title: option.label,
                    }))}
                >   
                    <PressableSurface style={{paddingVertical: 5, paddingHorizontal: 8, borderRadius: theme.borderRadius}}>
                        <ThemedText
                        variant="regular"
                        size={theme.fontSizes.small}
                        style={{
                            fontFamily: theme.fonts.regular.fontFamily,
                            fontSize: theme.fontSizes.small,
                            color: '#000',
                        }}
                        >
                        {props.value || 'Select...'}
                        </ThemedText>
                    </PressableSurface>
                </MenuView>
            )}
        </View>
    )
}