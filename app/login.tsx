import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { OAuthProvider } from '@/constants/General';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import ThemedText from '@/components/ThemedText';

const Login = () => {
  const router = useRouter();
  const { startOAuthFlow: googleOAuthFlow } = useOAuth({ strategy: OAuthProvider.Google });
  const { startOAuthFlow: appleOAuthFlow } = useOAuth({ strategy: OAuthProvider.Apple });
  const { startOAuthFlow: facebookOAuthFlow } = useOAuth({ strategy: OAuthProvider.Facebook });
  const [email, setEmail] = useState('');
  const defaultStyles = useThemedStyles();
  const colorScheme = useColorScheme();
  // TODO: Add email login
  
  const onSelectAuthProvider = async (strategy: OAuthProvider) => {
    const selectedAuth = {
      [OAuthProvider.Google]: googleOAuthFlow,
      [OAuthProvider.Apple]: appleOAuthFlow,
      [OAuthProvider.Facebook]: facebookOAuthFlow,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      } else {
        console.log('Error creating session');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={[styles.container, defaultStyles.container]}>
      <ThemedText style={styles.header}>Login or create an account</ThemedText>
      <ThemedText style={styles.subheader}>
        By continuing, you agree to our <ThemedText style={styles.link}>Terms of Service</ThemedText> and <ThemedText style={styles.link}>Privacy Policy</ThemedText>
      </ThemedText>
      <View style={styles.emailContainer}>
        <ThemedText style={styles.label}>Email address</ThemedText>
        <TextInput style={styles.input} placeholder='Email address' value={email} onChangeText={setEmail} />
        <TouchableOpacity style={[styles.button, defaultStyles.button]}>
          <Text style={[styles.buttonText, defaultStyles.buttonText]}>Continue with email</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.oauthContainer}>
        <TouchableOpacity style={styles.outlineButton} onPress={() => onSelectAuthProvider(OAuthProvider.Google)}>
          <Ionicons name="logo-google" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ paddingRight: 12 }}/>
          <ThemedText style={styles.oauthButtonText}>Continue with Google</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton} onPress={() => onSelectAuthProvider(OAuthProvider.Apple)}>
          <Ionicons name="logo-apple" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ paddingRight: 12 }}/>
          <ThemedText style={styles.oauthButtonText}>Continue with Apple</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton} onPress={() => onSelectAuthProvider(OAuthProvider.Facebook)}>
          <Ionicons name="logo-facebook" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} style={{ paddingRight: 12 }}/>
          <ThemedText style={styles.oauthButtonText}>Continue with Facebook</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 30,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 15,
    color: '#4f4f4f',
    textAlign: 'center',
    marginBottom: 30,
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
  emailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#4f4f4f',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
  },
  divider: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    borderBottomColor: Colors.light.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dividerText: {
    fontFamily: 'mon-sb',
    color: Colors.light.gray,
    fontSize: 16,
  },
  oauthContainer: {
    marginTop: 20,
    gap: 10,
  },
  oauthTitle: {
    fontSize: 15,
    color: '#4f4f4f',
    marginBottom: 10,
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: Colors.light.gray,
    borderRadius: 4,
    height: 50,
  },
  oauthButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});